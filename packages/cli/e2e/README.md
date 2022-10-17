# Running tests

## E2E

``` sh
npm run test
```

You can also run bats directly using `/bats` submodule to run tests with different command options, e.g.:

``` sh
./bats/bin/bats test.bats --verbose-run --show-output-of-passing-tests
```
