// Runtime shim for the unpublished private package. Specs never exercise the player.
class PlyrModule { static forRoot() { return { ngModule: PlyrModule, providers: [] }; } }
class PlyrComponent {}
class DefaultPlyrDriver {}
module.exports = { PlyrModule, PlyrComponent, DefaultPlyrDriver };
