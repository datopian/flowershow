# Running tests

## E2E

``` sh
npm run test
```

You can also run bats directly using `/bats` submodule to run tests with different command options, e.g.:

``` sh
./e2e/bats/bin/bats e2e/test.bats --verbose-run --show-output-of-passing-tests
```

Run bats with `--help` to see available options.

### Tests tagged `netlify`

Tests with `netlify` tag require Netlify personal access token to be set in `NETLIFY_TOKEN` environment variable. You can add it in `e2e/.env` file. (See `e2e/.env.example` for reference.)

If you don't want to run these tests, you can exclude them bu running bats manually with this command:

``` sh
./e2e/bats/bin/bats e2e/test.bats --filter-tags \!netlify
```
