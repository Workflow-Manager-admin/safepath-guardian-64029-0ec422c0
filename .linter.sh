#!/bin/bash
cd /home/kavia/workspace/code-generation/safepath-guardian-64029-0ec422c0/safe_path_guardian_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

