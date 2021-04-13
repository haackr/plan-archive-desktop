import React from "react";
import { useQuery, gql } from "@apollo/client";
import { TableBuilder, TableBuilderColumn } from "baseui/table-semantic";
import { Tag, KIND, VARIANT } from "baseui/tag";
import { StatefulTooltip } from "baseui/tooltip";
import { format } from "date-fns";
import { useParams } from "react-router-dom";

const SHEET_LIST_QUERY = gql`
  query SHEET_LIST_QUERY($SetId: Int!) {
    set(where: { Key: $SetId }) {
      ID
      Title
      Key
      Sheets {
        id
        Title
        Sheet_Number
        Year
        Month
        Day
        FilePathPDF
        FilePathPNG
        FilePathTIFF
        FilePathDWG
      }
    }
  }
`;

const SheetList: React.FC = () => {
  const { id }: any = useParams();
  console.log(`Sheet id is ${id}`);
  const { loading, error, data } = useQuery(SHEET_LIST_QUERY, {
    variables: { SetId: parseInt(id) },
  });
  if (error) return <div>{error.message}</div>;
  return (
    <TableBuilder
      isLoading={loading}
      data={loading ? [] : data.set.Sheets}
      emptyMessage="No sheets found!"
    >
      <TableBuilderColumn header="Title">
        {(row) => row.Title}
      </TableBuilderColumn>
      <TableBuilderColumn header="ID">{(row) => row.id}</TableBuilderColumn>
      <TableBuilderColumn header="Sheet Number">
        {(row) => row.Sheet_Number}
      </TableBuilderColumn>
      <TableBuilderColumn header="File Types">
        {(row) => {
          let tags = [];
          if (row.FilePathPDF) {
            tags.push({ type: "pdf", path: row.FilePathPDF });
          }
          if (row.FilePathPNG) {
            tags.push({ type: "png", path: row.FilePathPNG });
          }
          if (row.FilePathTIFF) {
            tags.push({ type: "tiff", path: row.FilePathTIFF });
          }
          if (row.FilePathDWG) {
            tags.push({ type: "dwg", path: row.FilePathDWG });
          }
          return (
            <span>
              {tags.map((tag) => (
                <Tag
                  kind={KIND.positive}
                  key={`${row.id}-${tag.type}`}
                  closeable={false}
                  variant={VARIANT.solid}
                  title={tag.path}
                >
                  {tag.type}
                </Tag>
              ))}
            </span>
          );
        }}
      </TableBuilderColumn>
    </TableBuilder>
  );
};

export default SheetList;
