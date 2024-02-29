import type React from 'react';
import { Pagination } from 'antd';

interface CustomPaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  total_pages: number;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  page,
  setPage,
  total_pages,
}: CustomPaginationProps) => {
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Pagination
      current={page}
      onChange={handlePageChange}
      total={total_pages}
      pageSize={1}
      responsive
      showSizeChanger={false}
    />
  );
};

export default CustomPagination;
