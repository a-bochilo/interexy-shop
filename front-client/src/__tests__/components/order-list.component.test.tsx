/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
// eslint-disable-next-line testing-library/no-unnecessary-act
import { render, waitFor, screen, act, fireEvent } from "@testing-library/react";
import OrdersListTable from "../../components/orders-list.component";
import { order, orderItem, ordersWithColumnsTranslate } from "../mocks/data.mocks";

describe("Order list component with orders", () => {
  const handleGetOrderItem = jest.fn().mockResolvedValueOnce(0);
  it("should render component", async () => {
    render(
      <OrdersListTable
        orders={[order]}
        order={[orderItem]}
        handleGetOrderItem={handleGetOrderItem}
        ordersWithColumnsTranslate={ordersWithColumnsTranslate}
      />
    );

    await act(async () => fireEvent.click(screen.getByRole("button")));
    await waitFor(() => expect(handleGetOrderItem).toHaveBeenCalledTimes(1));
  });

  it("should render component without orders", async () => {
    render(
      <OrdersListTable
        orders={[order]}
        order={[]}
        handleGetOrderItem={handleGetOrderItem}
        ordersWithColumnsTranslate={ordersWithColumnsTranslate}
      />
    );
  });
});
