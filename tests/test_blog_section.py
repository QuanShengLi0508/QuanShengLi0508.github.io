#!/usr/bin/env python3
"""Static checks for the homepage Blog section placement."""
from html.parser import HTMLParser
from pathlib import Path


class HomepageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.nav_links = []
        self.sections = []
        self._current_nav_href = None
        self._current_nav_text = []
        self._in_blog = False
        self._blog_depth = 0
        self.blog_text = []
        self.blog_classes = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "a" and attrs.get("class") == "nav-link":
            self._current_nav_href = attrs.get("href", "")
            self._current_nav_text = []
        if tag == "section" and attrs.get("id"):
            section_id = attrs["id"]
            self.sections.append(section_id)
            if section_id == "blog":
                self._in_blog = True
                self._blog_depth = 1
        elif self._in_blog:
            self._blog_depth += 1
            cls = attrs.get("class", "")
            if cls:
                self.blog_classes.extend(cls.split())

    def handle_endtag(self, tag):
        if tag == "a" and self._current_nav_href is not None:
            self.nav_links.append((self._current_nav_href.lstrip("#"), "".join(self._current_nav_text).strip()))
            self._current_nav_href = None
            self._current_nav_text = []
        if self._in_blog:
            self._blog_depth -= 1
            if self._blog_depth == 0:
                self._in_blog = False

    def handle_data(self, data):
        if self._current_nav_href is not None:
            self._current_nav_text.append(data)
        if self._in_blog:
            self.blog_text.append(data.strip())


def main():
    parser = HomepageParser()
    parser.feed(Path("index.html").read_text(encoding="utf-8"))

    nav_ids = [href for href, _ in parser.nav_links]
    nav_labels = dict(parser.nav_links)

    assert nav_ids[-2:] == ["blog", "contact"], f"Blog should be second-to-last nav item before Contact, got {nav_ids}"
    assert nav_labels.get("blog") == "Blog", f"Blog nav label should be Blog, got {nav_labels.get('blog')!r}"

    education_idx = parser.sections.index("education")
    assert parser.sections[education_idx:education_idx + 3] == ["education", "blog", "contact"], (
        f"Section order should be education -> blog -> contact, got {parser.sections}"
    )

    blog_text = " ".join(text for text in parser.blog_text if text)
    assert "Personal Blog" in blog_text, "Blog section should have a Personal Blog heading"
    assert "blog-list" in parser.blog_classes, "Blog section should contain a vertical blog-list container"
    assert "blog-grid" not in parser.blog_classes, "Blog section should not use the old grid layout"
    assert parser.blog_classes.count("blog-row") >= 3, "Blog section should contain at least three horizontal blog rows"


if __name__ == "__main__":
    main()
