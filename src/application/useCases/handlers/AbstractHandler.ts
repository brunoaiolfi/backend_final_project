class AbstractHandler<Model, Entity> {
    private repository: any;

    constructor(repositoryClass: any) {
        this.repository = new repositoryClass();
    }

    public async getAll(): Promise<Model[]> {
        return await this.repository.getAll();
    }

    public async getBy(key: string, value: any): Promise<Model> {
        return await this.repository.getBy(key, value);
    }

    public async create(user: Entity): Promise<Model> {
        return await this.repository.post(user);
    }

    public async update(id: number, user: Entity): Promise<Model> {
        return await this.repository.put(id, user);
    }

    public async delete(id: number): Promise<void> {
        return await this.repository.delete(id);
    }
}

export default AbstractHandler;