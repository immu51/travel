#!/bin/bash
set -e
cd backend
npm install --omit=dev
exec node index.js
