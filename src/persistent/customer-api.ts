import { BaseCriteria, ListResult } from '../models/base-models';
import { CustomerDto, CustomerType } from '../models/youtebe-models';

export const fetchCustomers = async (
  searchCriteria: BaseCriteria
): Promise<ListResult<CustomerDto>> => {
  const _datas = datas.filter(
    (item) =>
      !searchCriteria.searchCriteria ||
      (item.companyName &&
        item.companyName.indexOf(searchCriteria.searchCriteria) >= 0)
  );
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalPage: Math.ceil(_datas.length / searchCriteria.pageSize),
        items: _datas.slice(
          (searchCriteria.page - 1) * searchCriteria.pageSize,
          searchCriteria.page * searchCriteria.pageSize
        ),
      });
    }, 500);
  });
};

export const fetchCustomer = async (
  id: string
): Promise<CustomerDto | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(datas.find((v) => v.id === id));
    }, 500);
  });
};

export const deleteCustomer = async (id: string): Promise<void> => {
  datas = datas.filter((v) => v.id !== id);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};

export const deleteCustomers = async (ids: string[]): Promise<void> => {
  datas = datas.filter((v) => !ids.find((id) => id === v.id));
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};

export const addCustomer = async (dto: CustomerDto): Promise<CustomerDto> => {
  const newDto = {
    ...dto,
    id: `${datas.length + 1}`,
    createdAt: new Date(),
    modifiedAt: new Date(),
  };
  datas.push(newDto);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(newDto);
    }, 500);
  });
};

export const updateCustomer = async (dto: CustomerDto): Promise<void> => {
  for (let ind = 0; ind < datas.length; ind++) {
    if (datas[ind].id === dto.id) {
      datas[ind] = dto;
    }
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};

let datas: CustomerDto[] = Array(10)
  .fill(1)
  .map((item, index) => ({
    id: `${index}`,
    modifiedAt: new Date(),
    createdAt: new Date(),
    customerType: CustomerType.Individual,
    companyName: `company name - ${index}`,
    UENNo: 'uenNo - string',
    POCName: 'pocName - string',
    POCEmail: 'pocEmail - string',
    POCContactNo: 'pocContactNo -string',
    PIC: 'pic - string',
    PICEmail: 'picEmail - string',
    PICContactNo: 'picContactNo - string',
    customerRemarks: 'customerRemarks - string',

    address1: 'string',
    address2: 'string',
    city: 'string',
    country: 'string',
    postalCode: 'string',
  }));
