import React from "react";
import { useQuery, gql } from "@apollo/client";
import { TableBuilder, TableBuilderColumn } from "baseui/table-semantic";
import { Tag, KIND, VARIANT } from "baseui/tag";
import { Button } from "baseui/button";
import { useHistory, useParams } from "react-router-dom";
import { ipcRenderer } from "electron";

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
  const history = useHistory();
  const { id }: any = useParams();
  const { loading, error, data } = useQuery(SHEET_LIST_QUERY, {
    variables: { SetId: parseInt(id) },
  });
  if (error) return <div>{error.message}</div>;
  console.log(history);
  return (
    <div>
      <Button onClick={() => history.goBack()}>Back</Button>
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
                    onClick={() => {
                      ipcRenderer.send("open_file", tag.path);
                    }}
                  >
                    {tag.type}
                  </Tag>
                ))}
              </span>
            );
          }}
        </TableBuilderColumn>
      </TableBuilder>
    </div>
  );
};

export default SheetList;
