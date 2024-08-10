# Font subset

제목 폰트 최적화

`./Lato-Thin.ttf`: 원본 폰트

사전설치

```sh
pip install fonttools zopfli brotli
```

명령어

윈도우는 \ 대신 ^

WOFF

```sh
pyftsubset "Lato-Hairline.ttf" \
  --flavor="woff" \
  --with-zopfli \
  --output-file="./Lato-Hairline_exitmoe.woff" \
  --text-file="glyphs.txt" \
  --layout-features='*' \
  --glyph-names \
  --symbol-cmap \
  --legacy-cmap \
  --notdef-glyph \
  --notdef-outline \
  --recommended-glyphs \
  --name-legacy \
  --drop-tables= \
  --name-IDs='*' \
  --name-languages='*'
```

WOFF2

```sh
pyftsubset "Lato-Hairline.ttf" \
  --flavor="woff2" \
  --output-file="./Lato-Hairline_exitmoe.woff2" \
  --text-file="glyphs.txt" \
  --layout-features='*' \
  --glyph-names \
  --symbol-cmap \
  --legacy-cmap \
  --notdef-glyph \
  --notdef-outline \
  --recommended-glyphs \
  --name-legacy \
  --drop-tables= \
  --name-IDs='*' \
  --name-languages='*'
```
