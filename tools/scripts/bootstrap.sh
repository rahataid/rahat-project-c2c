#! /bin/sh

pnpm install

source './tools/scripts/utils.sh'

create_env
setup
graph_setup

echo $graph_url