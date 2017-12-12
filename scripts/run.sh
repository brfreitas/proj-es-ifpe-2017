#!/usr/bin/env bash
until cd /code && npm install
do
    echo "Retrying npm"
done
npm run dev
