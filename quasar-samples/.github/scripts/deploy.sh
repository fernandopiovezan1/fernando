#!/bin/bash

cd functions || exit

firebase use --token $TOKEN $PROJECT_ID

firebase functions:config:set env=$ENV_FUNCTIONS --token $TOKEN

cp ../$FILE.functions ../fileRead
while IFS= read -r p; do
  if [ ! -z "$p" ]; then
    FUNCTION=$(echo $p | tr '\r' ' ')
    echo "Deploy function -> " $FUNCTION
    firebase deploy -P $PROJECT_ID --token $TOKEN --only functions:$FUNCTION
    if [ $? -eq 0 -a ! -z "$NEXT_FILE" ]; then
      echo $FUNCTION >>../$NEXT_FILE.functions
      echo "$(grep -v $FUNCTION ../$FILE.functions)" >../$FILE.functions
    fi
  fi
done <../fileRead
rm -rf ../fileRead
