current_dir="$PWD"

create_env() {
    declare -a projectDirs=(
        "$current_dir"
    )

    for project in "${projectDirs[@]}"; do
        env_file="$project/.env"
        example_content=$(<"$project/.env.example")
        echo "$example_content" >"$env_file"
    done
}

setup() {
    pnpm seed:c2c $current_dir
    pnpm migrate:dev
    pnpm seed:project
    # pnpm seed:networks  $current_dir
}
