export enum OwnerRequestStates { Pending=0, Approved=1, Rejected=2}
export enum Platform { Mobile, Web, IOT }
export enum Media { Pictures, videos, GIF }
export class OwnerModel {
    public Id: number;
    public CompanyName: string;
    public Description: string;
    public FoundedYear: number;
    public WebsiteUrl: string;
    public OwnerStates: OwnerRequestStates = OwnerRequestStates.Pending;
}

export class ProductModel {
    public Id: number;
    public Name: string;
    public Description: string;
    public HomepageUrl: string;
    public PlayStoreUrl: string;
    public AppStoreUrl: string;
    public ProductPlatform: Platform;
    //public hiddenbutton: Array<boolean>;
}

export class ProductUpdate {
    public ProductId: number;
    public Title: string;
    public Details: string;
    public ProductMedia: Media;
    public ImagePath: string;
    public VideoUrl: string;
    public Gifpath: string;
}