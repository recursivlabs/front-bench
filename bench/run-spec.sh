#!/bin/bash
# Run one bug's spec the way the team does. Usage: bench/run-spec.sh <iid>
# Prints every failing check with its message, then the TOTAL line. Exit 0 only when the spec passes.
set -o pipefail
IID="$1"; cd "$(dirname "$0")/.." || exit 2
SPEC=$(node -e "const b=require('./bench/instances.json').find(x=>x.iid==='$IID');process.stdout.write(b?b.spec:'')")
FIX=$(node -e "const b=require('./bench/instances.json').find(x=>x.iid==='$IID');process.stdout.write(b?b.fix_commit:'')")
test -n "$SPEC" || { echo "unknown bug $IID"; exit 2; }
if [ ! -f .bench-spec-$IID ]; then
  git fetch -q --depth 1 https://github.com/Minds/front.git "$FIX" && git checkout -q FETCH_HEAD -- "$SPEC" && touch .bench-spec-$IID
fi
CHROME="${CHROME_BIN:-$(command -v chromium || command -v chromium-browser || command -v google-chrome || echo '')}"
CHROME_BIN="$CHROME" npx ng test --watch=false --browsers=ChromeHeadlessCI --source-map=false --include="$SPEC" > .bench-last.log 2>&1
CODE=$?
grep -E "✖|✗|FAILED|Expected|Error:|error TS|TOTAL:" .bench-last.log | grep -v "^\s*at " | head -60
echo "EXIT:$CODE"
exit $CODE
