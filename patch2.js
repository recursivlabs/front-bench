const fs = require('fs');
const file = 'src/app/common/services/group-membership.service.ts';
let code = fs.readFileSync(file, 'utf8');

const oldJoinCode = `              if (
                groupJoinOptions?.navigateOnSuccess &&
                !this.router.url.includes(\`/group/\${groupGuid}\`)
              ) {
                this.router.navigateByUrl(\`/group/\${groupGuid}\`);
              }`;

const newJoinCode = `              if (groupJoinOptions?.navigateOnSuccess) {
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

if (code.includes(oldJoinCode)) {
  code = code.replace(oldJoinCode, newJoinCode);
  fs.writeFileSync(file, code);
  console.log("Patched successfully!");
} else {
  console.log("Could not find the target code to replace.");
}
