import {
  getDashboardController,
  getRentalChartController,
} from "src/backend-mock/controllers/dashboardController";

import type { SuccessResponse } from "src/types/apiTypes";
import type { DashboardData, RentalChartPoint } from "src/types/dashboardTypes";

export async function getDashboardAPI(): Promise<
  SuccessResponse<DashboardData>
> {
  try {
    const result = await getDashboardController();

    return {
      data: result,
      message: null,
    };
  } catch (error) {
    throw error;
  }
}

export async function getRentalChartAPI(): Promise<
  SuccessResponse<RentalChartPoint[]>
> {
  try {
    const result = await getRentalChartController();

    return {
      data: result,
      message: null,
    };
  } catch (error) {
    throw error;
  }
}
