# Brontosaurus-Library

[![Build Status](https://travis-ci.com/SudoDotDog/Brontosaurus-Library.svg?branch=master)](https://travis-ci.com/SudoDotDog/Brontosaurus-Library)
[![codecov](https://codecov.io/gh/SudoDotDog/Brontosaurus-Library/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Brontosaurus-Library)

:flags: Doc service for Brontosaurus user

## Use With Docker

Here's a example Dockerfile

```dockerfile
FROM brontosaurus/library:1.0.0

# ./config.json
ENV BRONTOSAURUS_LIBRARY_CONFIG <Config File Path>

ENV BRONTOSAURUS_LIBRARY_PATH <Host Name>
ENV BRONTOSAURUS_PORTAL_PATH <Brontosaurus Portal Path>
ENV BRONTOSAURUS_APPLICATION_KEY <Brontosaurus Application Key>
ENV BRONTOSAURUS_PUBLIC_KEY <Brontosaurus Public Key>

COPY ./config.json .
COPY ./library ./library
```
