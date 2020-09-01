#!/bin/bash

./wait-for-it.sh database:3306 --timeout=30 -- flask db upgrade;

init_db() {
 flask db init;
 flask db migrate;
 flask db upgrade;
}

init_db
#/start.sh

python bnbgotit.py