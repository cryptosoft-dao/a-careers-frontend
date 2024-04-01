import { get } from "@/lib/utils/request";

import { APIs } from "@/config/api.config";

import { Order } from "@/openapi/client";
import { IOrderArgs } from "@/interfaces/serviceArgs";

export async function getOrders(query: string) {
  return await get<Order[]>({
    url: APIs.orders.search(query),
  });
}

export async function getOrder(args: IOrderArgs) {
  return await get<Order>({
    url: `${APIs.orders.get(args)}`,
  });
}

export async function getOrdersCount(query?: string) {
  return await get<number>({
    url: `${APIs.orders.counts}?${query}`,
  });
}
