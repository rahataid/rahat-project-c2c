#! /bin/sh

pnpm install --frozen-lockfile


source './tools/scripts/utils.sh'

create_env
gen_prisma
setup
graph_setup
seed_settings

