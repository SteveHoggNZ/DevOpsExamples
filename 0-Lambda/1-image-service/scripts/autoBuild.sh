#!/usr/bin/env bash

echo 'Watching src and auto-building'

fswatch -0 $(pwd)/src | \
  while read -d "" event; do
    scripts/build.sh
  done
