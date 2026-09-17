# SPARK bug bench, native run

Pinned Minds `front` tree for the bug-fixing bench. Changes from upstream, all in this directory or listed here:

- `package.json`: three private Minds packages replaced. `plyr` points at the public `plyr@^3.8.4`; `ngx-plyr-mg` and `@mindsorg/web3modal-angular` are empty stubs under `bench/stubs/`; the unpublished `micro-bip32` is overridden to its public successor `@scure/bip32@1.7.0`. The `prepare` script (husky) is removed. The lock file is the upstream lock with only those entries re-resolved.
- `src/_stubs.d.ts`: ambient types for the stubbed packages so the whole-program typecheck passes.
- `bench/instances.json`: the nine bugs. `base` is the commit the fix was written against, `fix_commit` the human fix, `spec` the team's own test.
- `bench/run-spec.sh <iid>`: runs that bug's spec, taking the spec file from the human fix commit. Exit 0 = pass.
- `.github/workflows/bench-spec.yml`: the grade. On a PR from a branch `bench/<iid>/<run>`, runs that bug's spec. Green = the fix passes the team's own test.
- Branches `bug/<iid>`: the tree at each bug's base commit with these files added. Work starts from there.
