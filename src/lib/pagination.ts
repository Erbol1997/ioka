export class Pagination {
    private _totalPages: number;
    private _step: number;
    private _isLooped: boolean;

    constructor (totalPages: number, step: number = 5, isLooped: boolean = false) {
        this._totalPages = totalPages;
        this._step = step;
        this._isLooped = isLooped;
    }

    get totalPages() {
        return this._totalPages;
    }

    // get currentPage() {
    //
    // }
}