import React from "react";
import { useQuery, gql } from "@apollo/client";
import { TableBuilder, TableBuilderColumn } from "baseui/table-semantic";
import { format } from "date-fns";

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
    <TableBuilder data={loading ? [] : data.school.Sets} isLoading={loading}>
      <TableBuilderColumn header="ID">{(row) => row.ID}</TableBuilderColumn>
      <TableBuilderColumn header="Key">{(row) => row.Key}</TableBuilderColumn>
      <TableBuilderColumn header="Title">
        {(row) => row.Title}
      </TableBuilderColumn>
      <TableBuilderColumn header="Date">
        {(row) => {
          const setDate = new Date(
            parseInt(row.Year.trim()),
            parseInt(row.Month.trim()),
            parseInt(row.Day.trim())
          );
          return format(setDate, "yyyy/MM/dd");
        }}
      </TableBuilderColumn>
    </TableBuilder>
  );
};

export default SetList;
