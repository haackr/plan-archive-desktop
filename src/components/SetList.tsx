import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Table } from "baseui/table-semantic";

type SetListProps = {
  schoolId: number;
};

type Set = {
  ID: number;
  Key: string;
  Title: string;
  Year: string;
  Month: string;
  Day: string;
};

const SET_LIST_QUERY = gql`
  query SET_LIST_QUERY($schoolId: Int!) {
    school(where: { id: $schoolId }) {
      Sets {
        ID
        Key
        Title
        Year
        Month
        Day
      }
    }
  }
`;

const SetList: React.FC<SetListProps> = ({ schoolId }) => {
  console.log(schoolId);
  const { loading, error, data } = useQuery(SET_LIST_QUERY, {
    variables: { schoolId },
  });
  const COLUMNS = ["ID", "KEY", "TITLE", "YEAR", "MONTH", "DAY"];
  if (error) return <p>ERROR: {error.message}</p>;
  return (
    <Table
      isLoading={loading}
      columns={COLUMNS}
      emptyMessage="No sets found!"
      data={
        loading
          ? []
          : data.school.Sets.map((set: Set) => [
              set.ID,
              set.Key,
              set.Title,
              set.Year,
              set.Month,
              set.Day,
            ])
      }
    />
  );
};

export default SetList;
