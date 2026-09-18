const fs = require('fs');
const file = 'src/app/common/services/group-membership.service.ts';
let code = fs.readFileSync(file, 'utf8');

const newAcceptInvitation = `  public acceptInvitation(): void {
    this.inProgress$.next(true);

    this.subscriptions.push(
      this.groupGuid$
        .pipe(
          take(1), // call once
          throttleTime(2000), // disallow more than 1 request every 2s
          switchMap(
            (groupGuid: string): Observable<{response: GroupMembershipResponse, groupGuid: string}> => {
              // switch outer observable to api req.
              return this.api.post(
                \`\${this.base}invitations/\${groupGuid}/accept\`
              ).pipe(map((response: GroupMembershipResponse) => ({ response, groupGuid })));
            }
          ),
          tap(({ response }): void => {
            if (!response.done) {
              throw new Error(
                response?.message ?? 'An unknown error has occurred'
              );
            }
          }),
          catchError((e) => {
            this.handleRequestError(e, true);
            return of(null);
          })
        )
        .subscribe((result: any) => {
          this.inProgress$.next(false);

          if (result && result.response && result.response.status === 'success') {
            this.isMember$.next(true);
            this.isInvited$.next(false);

            if (!this.router.url.includes(\`/group/\${result.groupGuid}\`)) {
              this.router.navigateByUrl(\`/group/\${result.groupGuid}\`);
            } else {
              const currentUrl = this.router.url;
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigateByUrl(currentUrl);
              });
            }

            return;
          }
        })
    );
  }`;

// Replace the old acceptInvitation method
const oldAcceptInvitationRegex = /public acceptInvitation\(\): void \{[\s\S]*?(?=\n  \/\*\*\n   \* Decline an invitation to join the group)/;
code = code.replace(oldAcceptInvitationRegex, newAcceptInvitation + '\n');
fs.writeFileSync(file, code);
