#!/usr/bin/env python3
"""Checks that the first blog article has source/PDF assets and homepage links."""
from html.parser import HTMLParser
from pathlib import Path

ARTICLE_TITLE = "AI 时代，我发现自己快不会思考了"
PUBLISH_DATE = "2026年5月11日"
PDF_PATH = Path("assets/blog/ai-era-thinking.pdf")
TEX_PATH = Path("assets/blog/ai-era-thinking.tex")


class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self._href = None
        self._text = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "a":
            self._href = attrs.get("href", "")
            self._text = []

    def handle_endtag(self, tag):
        if tag == "a" and self._href is not None:
            self.links.append((self._href, "".join(self._text).strip()))
            self._href = None
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)


def main():
    html = Path("index.html").read_text(encoding="utf-8")
    parser = LinkParser()
    parser.feed(html)
    links = dict(parser.links)

    assert ARTICLE_TITLE in html, "Homepage should show the first blog article title"
    assert f"发表日期：{PUBLISH_DATE}" in html, "Homepage should show the blog article publication date"
    assert "assets/blog/ai-era-thinking.pdf" in links, "Homepage should link to the compiled blog PDF"
    assert "assets/blog/ai-era-thinking.tex" in links, "Homepage should link to the LaTeX source"

    assert PDF_PATH.exists(), "Compiled PDF should exist under assets/blog"
    assert TEX_PATH.exists(), "LaTeX source should exist under assets/blog"
    assert PDF_PATH.read_bytes().startswith(b"%PDF-"), "PDF asset should be a valid PDF file"
    tex = TEX_PATH.read_text(encoding="utf-8")
    assert ARTICLE_TITLE in tex, "LaTeX source should contain the blog article title"
    assert PUBLISH_DATE in tex, "LaTeX source should contain the publication date"
    assert "\\section{我的现状" in tex, "LaTeX source should preserve article sections"


if __name__ == "__main__":
    main()
