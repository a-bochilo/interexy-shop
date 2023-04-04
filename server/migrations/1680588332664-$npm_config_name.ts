import { MigrationInterface, QueryRunner, TableIndex } from "typeorm";

export class $npmConfigName1680588332664 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex("cart_items", getToCartItems());
    await queryRunner.createIndices(
      "product_details",
      getIndiciesToProductDetails()
    );
    await queryRunner.createIndices("products", getIndiciesToProducts());
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

const getColumnIndex = (columnName: string) =>
  new TableIndex({ name: `IX_${columnName}`, columnNames: [columnName] });

const getToCartItems = () => {
  return new TableIndex({
    name: "IX_product_id",
    columnNames: ["product_id"],
  });
};

const getIndiciesToProductDetails = () => {
  const columnsArray = ["material", "size"];

  return columnsArray.map(getColumnIndex);
};

const getIndiciesToProducts = () => {
  const columnsArray = ["brand", "price", "quantity"];

  return columnsArray.map(getColumnIndex);
};
