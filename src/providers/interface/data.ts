export class TabData {
    private _tabName: string;
    private _page: number;
    private _topics: Array<any>;

    constructor(tabName: string, page: number, topics: Array<any>) {
        this._tabName = tabName;
        this._page = page;
        this._topics = topics;
    }
    get tabName(): string {
        return this._tabName;
    }
    set tabName(tabName: string) {
        this._tabName = tabName;
    }
    get page(): number {
        return this._page;
    }
    set page(page: number) {
        this._page = page;
    }
    get topics(): Array<any> {
        return this._topics;
    }
    set topics(topics: Array<any>) {
        this._topics = topics;
    }
    // private update(tabData: TabData): TabData {
    //     if (tabData.tabName == this.tabName) {
    //         this.topics = tabData.topics;
    //     }
    //     return this;
    // }
}