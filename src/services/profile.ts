import { get } from "@/lib/utils/request";

import { APIs } from "@/config/api.config";

import { IUserRes, IUserStats, IUserStats2 } from "@/interfaces/request";

import { Order, OrderActivity } from "@/openapi/client";
import { IUser } from "@/interfaces";
import { IUserOrdersArgs } from "@/interfaces/serviceArgs";

export async function getUserProfile(args: {
  address: string;
  locale: string;
}) {
  return await get<IUserRes>({
    url: `${APIs.user.profile(args.address, args.locale)}`,
  });
}

export async function getUser(args: { index: string; locale: string }) {
  return await get<IUser>({
    url: `${APIs.user.get(args.index, args.locale)}`,
  });
}

export async function getUserStatus(args: {
  index: number;
}) {
  return await get<IUserStats>({
    url: `${APIs.user.status(args.index)}`,
  });
}

export async function getUserStatus2(args: { index: number }) {
  return await get<IUserStats2>({
    url: `${APIs.user.stats(args.index)}`,
  });
}

export async function getUserActivity(args: {
  index: string;
  page: number;
  pageSize: number;
}) {
  return await get<OrderActivity[]>({
    url: `${APIs.user.activity(args.index, args.page, args.pageSize)}`,
  });
}

export async function getUserOrders(args: IUserOrdersArgs) {
  return await get<Order[]>({
    url: `${APIs.user.orders(args)}`,
  });
}
