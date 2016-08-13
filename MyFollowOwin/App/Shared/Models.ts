export enum OwnerRequestStates { Pending=0, Approved=1, Rejected=2}
enum Platform {Mobile,Web,IOT}
export class OwnerModel {
    public Id: number;
    public CompanyName: string;
    public Description: string;
    public FoundedYear: number;
    public WebsiteUrl: string;
    public OwnerStates: OwnerRequestStates = OwnerRequestStates.Pending;
}

export class ProductModel {
    public ProductId: number;
    public Name: string;
    public Description: string;
    public HomepageUrl: string;
    public PlayStoreUrl: string;
    public AppStoreUrl: string;
    public ProductPlatform: Platform;
}