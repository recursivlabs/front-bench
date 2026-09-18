const fs = require('fs');
const file = 'src/app/common/services/group-membership.service.ts';
let code = fs.readFileSync(file, 'utf8');

const oldCode = `              // only navigate if requested, and the user is not already on the page.
              if (
                groupJoinOptions?.navigateOnSuccess &&
                !this.router.url.includes(\`/group/\${groupGuid}\`)
              ) {
                this.router.navigateByUrl(\`/group/\${groupGuid}\`);
              }`;

const newCode = `              // only navigate if requested, and the user is not already on the page.
              if (groupJoinOptions?.navigateOnSuccess) {
                if (!this.router.url.includes(\`/group/\${groupGuid}\`)) {
                  this.router.navigateByUrl(\`/group/\${groupGuid}\`);
                } else {
                  // Force a route refresh if the user is already on the page.
                  const currentUrl: string = this.router.url;
                  this.router
                    .navigateByUrl('/', { skipLocationChange: true })
                    .then(() => {
                      this.router.navigateByUrl(currentUrl);
                    });
                }
              }`;

if (code.includes(oldCode)) {
  code = code.replace(oldCode, newCode);
  fs.writeFileSync(file, code);
  console.log("Replaced successfully!");
} else {
  console.log("Could not find the target code to replace.");
}
