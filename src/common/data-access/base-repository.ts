import { 
    AggregateOptions, 
    ClientSession, 
    HydratedDocument, 
    Model, 
    PipelineStage, 
    QueryOptions, 
    UpdateQuery } from "mongoose";


export interface FindPaginatedOptions extends QueryOptions{
    page?:number;
    limit?:number;
    ignoreLimit?:boolean;
}

export interface CreateOptions{
    session?:ClientSession;
}
export interface FindOneOptions{
    session?:ClientSession;
}

export interface FindOneAndDeleteOptions{
    session?:ClientSession;
}

export interface FindByIdAndDeleteOptions{
    session?:ClientSession;
}

export interface UpdateManyOptions{
    session?:ClientSession;
}

export interface DeleteManyOptions {
  session?: ClientSession;
}

export class PaginationResult<T>{
    data:T[];
    totalCount:number;
    page:number | undefined;
    limit:number | undefined;
    pageCount:number;

    constructor(
        data:T[],
        totalCount:number,
        page:number | undefined,
        limit:number | undefined,
    ){
        this.data = data;
        this.totalCount = totalCount;
        this.page = page;
        this.limit = limit;
        this.pageCount = limit ? Math.ceil(totalCount / limit) : 0;
    }
}

export class BaseRepository<T>{

    constructor(public readonly model:Model<T>){}

    async create(
        body:Partial<T>,
        options?:CreateOptions
    ): Promise <HydratedDocument<T>>{
        const document = new this.model(body);
        await document.save({
            session:options?.session
        })
        return document;
    }

    async findById(
        id: string | number,
        options: QueryOptions = {lean:true}
    ){
        const document = await this.model.findById(id, undefined, options)
        return document;
    }

    async find(
        filterQuery:Record<string, unknown>,
        options: QueryOptions = {} 
    ){
        const document = this.model.find(filterQuery, undefined, options);
        return document;
    }

    async findOne(
        filterQuery?:Record<string, unknown>,
        options?:FindOneOptions
    ){
        const document = await this.model.findOne(filterQuery, undefined, {
            session:options?.session,
            lean:true
        });
        return document;
    }
    
    async findByIdAndUpdate(
        id: string | number,
        updateQuery:UpdateQuery<HydratedDocument<T>>,
        options:QueryOptions={}
    ){
        const document = await this.model.findByIdAndUpdate(id, updateQuery, {
            returnDocument: 'after',
            ...options,  
        })
        return document;
    }

    async findOneAndUpdate(
        filterQuery: Record<string, unknown>,
        updateQuery: UpdateQuery<HydratedDocument<T>>,
        options:QueryOptions={}
    ){
        const document = await this.model.findOneAndUpdate(filterQuery, updateQuery, {
            returnDocument: 'after',
            ...options,
        })
        return document;
    }

    async findByIdAndDelete(
        id: string|number, 
        options?:FindByIdAndDeleteOptions
    ){
        const document  = await this.model.findByIdAndDelete(id,{
            session:options?.session,
        })
        return document;
    }

    async aggregate<Response = any>(
        pipeline: PipelineStage[],
        options:AggregateOptions = {}
    ){
        const result = await this.model.aggregate<Response>(pipeline, options);
        return result
    }

    async count(
        filterQuery?: Record<string, unknown>
    ){
        const count = await this.model.countDocuments(filterQuery);
        return count;
    }

    async findPaginated(
        filterQuery: Record<string, unknown>,
        options?: FindPaginatedOptions
    ): Promise<PaginationResult<T>>{
        options = options || {};
        options.page = options.page || 1;
        options.limit = options.limit || 10;
        if(options.ignoreLimit && options.limit){
            delete options.limit;
        }
        const page = options?.page ?? 1;
        const limit = options?.limit ?? 10;
        const skip = (page - 1) * limit;
        
        const data = await this.model.find(filterQuery, undefined,{
            ...options,
            skip,
        })

        const totalCount = await this.model.countDocuments(filterQuery);

        const response = new PaginationResult<T>(
            data, 
            totalCount, 
            options?.page, 
            options?.limit
        );

        return response;
    }

    async findOneAndDelete(
        filterQuery: Record<string, unknown>,
        options?:FindOneAndDeleteOptions
    ){
        const document = await this.model.findOneAndDelete(filterQuery, {
            session:options?.session,
        })
        return document;
    }

    async updateMany(
        filterQuery: Record<string, unknown>,
        updateQuery: UpdateQuery<HydratedDocument<T>>,
        options?:UpdateManyOptions
    ){
        const result = await this.model.updateMany(filterQuery, updateQuery, {
            session:options?.session,
        })
        return result;
    }

    async deleteMany(
        filterQuery: Record<string, unknown>,
        options?:DeleteManyOptions
    ):Promise<{deletedCount: number}>{
        const result = await this.model.deleteMany(filterQuery, {
            session:options?.session,
        })
        return result;
    }






}








