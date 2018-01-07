#!/bin/sh
yo angular:route "wg-"$1 --uri=widgets/$1
cat templates/widget.html >> app/views/wg-$1.html