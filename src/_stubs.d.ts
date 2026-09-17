// Ambient stubs for private Minds packages unpublished from public npm.
// Only needed so the whole-program typecheck passes; not used at runtime by isolated specs.
declare module 'ngx-plyr-mg' {
  export class PlyrModule { static forRoot(...a: any[]): any; }
  export class PlyrComponent { constructor(...a: any[]); [k: string]: any; }
  export class DefaultPlyrDriver { constructor(...a: any[]); [k: string]: any; }
  export type PlyrDriver = any;
  export type PlyrDriverCreateParams = any;
  export type PlyrDriverDestroyParams = any;
  export type PlyrDriverUpdateSourceParams = any;
}
declare module '@mindsorg/web3modal-angular' {
  export class Web3ModalModule { static forRoot(...a: any[]): any; }
  export class Web3ModalService { constructor(...a: any[]); [k: string]: any; }
}
declare module '@mindsorg/minds-ckeditor-bundle' {
  const _default: any;
  export = _default;
}
declare module 'plyr' {
  class Plyr {
    constructor(...a: any[]);
    [k: string]: any;
  }
  namespace Plyr {
    type Options = any;
    type Source = any;
    type SourceInfo = any;
    type PlyrEvent = any;
  }
  export = Plyr;
}
declare namespace Plyr {
  type Options = any;
  type Source = any;
  type SourceInfo = any;
  type PlyrEvent = any;
}
