import * as React from 'react';
import * as styleRef from './style.treat';
import cx from 'classnames';
import useCheckboxSelection from '../../hooks/useCheckboxSelection';
import { Pos } from '../../constants';
import { motion } from 'framer-motion';
import {
  useScrollBasedOpacity,
  useTableClientSort,
  useTableClientFilter,
  useTableClientPagination,
} from './hooks';
import { dropdownVariants, useDropdownUI } from '../Dropdown/hooks';
import { arrayReplace, arraySort } from 'buildings-common/lib/array';
import Pagination from '../Pagination';
import Loading from '../Loading';
import { range } from 'buildings-common/lib/nodash/array';
import { FSP, FSPFilterFields, FilterType } from 'buildings-common/lib/fsp';
import Menu, { MenuItem } from '../../frames/Menu';
import EmptyData from '../EmptyData';
import Icon from '../Icon';
import MotionTether from '../MotionTether';
import { useStyles } from 'react-treat';
import { useI18N } from '../../_internal/i18n';
import { ICON_NAMES } from '../Icon/iconNames';

export interface ColumnFilterItem {
  text: string | null;
  value: string;
}

export interface ColumnProps<
  T extends {
    // Empty
  }
> {
  title: React.ReactNode;
  id?: string;
  fixed?: 'left' | 'right';
  dontPropagateClick?: boolean;
  width?: number;
  accessory?: React.ReactNode;
  children: (datum: T) => React.ReactNode;
}

type TableProps<
  T extends {
    // Empty
  }
> = {
  isLoading?: boolean;
  dataSource: T[];
  children: React.ReactNode;
  rowKey?: (datum: T) => string;
  expandedRecord?: T;
  renderExpandedRow?: (datum: T) => React.ReactNode;
  onClickRow?: (datum: T, rowIndex: number) => void;
  pagination?: boolean;
  onPaginationLoadingOrUpdating?: React.Dispatch<React.SetStateAction<number>>;
  fixedLayout?: boolean;
  defaultPageSize?: number;
  tableContainerClassName?: string;
  noDataHeight?: number;
  showArrows?: boolean;
  defaultPaginationRange?: number[];
} & (
  | {
      onServerFSP?: undefined;
    }
  | ({
      ouId: string;
      treeId: string;
      /**
       * @description FSP stands for Filter Sort Pagination
       */
      onServerFSP?: (ouId: string, treeId: string, fsp: FSP) => void;
      totalCount: number;
      paginationDropdown?: boolean;
    } & FSP)
);

function outputColumnContent<
  T extends {
    // Empty
  }
>(datum: T, column: ColumnProps<T>) {
  return column.children(datum);
}

function dontPropagateClick(e: React.MouseEvent) {
  e.stopPropagation();
}

function populateRows<
  T extends {
    // Empty
  }
>({
  dataSource,
  columns,
  rowKey,
  expandedRecord,
  renderExpandedRow,
  onClickRow,
  setHighlightRow,
  unsetHighlightRow,
  highlightRow,
  styles,
}: {
  dataSource: T[];
  columns: (ColumnProps<T> | undefined)[];
  highlightRow: number | null;
  setHighlightRow: (rowIndex: number) => void;
  unsetHighlightRow: () => void;
  rowKey?: (datum: T) => string;
  expandedRecord?: T;
  renderExpandedRow?: (datum: T) => React.ReactNode;
  onClickRow?: (datum: T, rowIndex: number) => void;
  styles: typeof styleRef;
}) {
  return dataSource.map((datum, rowIndex) => (
    <React.Fragment key={rowKey ? rowKey(datum) : rowIndex}>
      <tr
        className={cx({
          [styles.rowClickable]: Boolean(onClickRow),
          [styles.rowActive]: highlightRow === rowIndex,
        })}
        {...(onClickRow && {
          onClick: () => onClickRow(datum, rowIndex),
          onMouseEnter: () => setHighlightRow(rowIndex),
          onMouseLeave: unsetHighlightRow,
        })}
      >
        {columns.map((column, colIndex) => {
          return column ? (
            <td
              className={styles.contentCell}
              key={colIndex}
              onClick={
                column.dontPropagateClick ? dontPropagateClick : undefined
              }
            >
              <div className={styles.contentCellWrapper}>
                <span className={styles.contentCellValue}>
                  {outputColumnContent(datum, column)}
                </span>
              </div>
            </td>
          ) : null;
        })}
      </tr>
      {expandedRecord === datum && renderExpandedRow ? (
        <tr className={styles.expandedRow}>
          <td colSpan={columns.length}>
            <div className={styles.expandedRowContainer}>
              {renderExpandedRow(datum)}
            </div>
          </td>
        </tr>
      ) : null}
    </React.Fragment>
  ));
}

function generateTable<
  T extends {
    // Empty
  }
>({
  isLoading,
  dataSource,
  columns,
  highlightRow,
  setHighlightRow,
  unsetHighlightRow,
  rowKey,
  expandedRecord,
  renderExpandedRow,
  onClickRow,
  pageSize,
  showShowNoData = false,
  styles,
  fixedLayout = false,
  noDataHeight = 520,
}: {
  isLoading: boolean;
  dataSource: T[];
  columns: (ColumnProps<T> | undefined)[];
  highlightRow: number | null;
  setHighlightRow: (rowIndex: number) => void;
  unsetHighlightRow: () => void;
  rowKey?: (datum: T) => string;
  expandedRecord?: T;
  renderExpandedRow?: (datum: T) => React.ReactNode;
  onClickRow?: (datum: T, rowIndex: number) => void;
  pageSize: number;
  showShowNoData?: boolean;
  styles: typeof styleRef;
  fixedLayout: boolean;
  noDataHeight?: number;
}) {
  return (
    <table
      className={cx(styles.table, {
        [styles.tableFixed]: fixedLayout,
      })}
    >
      <thead>
        <tr>
          {columns.map((column, index) =>
            column ? (
              <th
                key={index}
                className={styles.headerCell}
                style={{
                  width: column.width,
                }}
              >
                <div className={styles.headerCellWrapper}>
                  <div>{column.title}</div>
                  <div>{column.accessory}</div>
                </div>
              </th>
            ) : null
          )}
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          range(pageSize).map(index => (
            <tr key={index}>
              {columns.map((_, colIndex) => (
                <td className={styles.contentCell} key={colIndex}>
                  <div className={styles.contentCellWrapper}>
                    <Loading
                      type={
                        index % 2 === 0
                          ? 'singleLine-long-thin'
                          : 'singleLine-short-thin'
                      }
                    />
                  </div>
                </td>
              ))}
            </tr>
          ))
        ) : dataSource.length === 0 ? (
          <tr>
            <td colSpan={columns.length}>
              <div
                className={styles.noDataBackground}
                style={{
                  height: noDataHeight,
                }}
              >
                {showShowNoData ? <EmptyData /> : null}
              </div>
            </td>
          </tr>
        ) : (
          populateRows({
            dataSource,
            columns,
            rowKey,
            expandedRecord,
            renderExpandedRow,
            onClickRow,
            highlightRow,
            setHighlightRow,
            unsetHighlightRow,
            styles,
          })
        )}
      </tbody>
    </table>
  );
}

export type TableContextType = {
  dataSource: {
    // Empty
  }[];
  currentFilterFields: FSPFilterFields;
  currentSortField: string | null;
  onChangeFilterField: (field: string, selectedList: string[]) => void;
  currentSortDirection: 'asc' | 'desc' | false;
  onChangeSortField: (
    field: string,
    reversed: boolean,
    binary: boolean
  ) => void;
  addColumn: (id: string) => void;
  updateColumn: (
    id: string,
    props: ColumnProps<{
      // Empty
    }>
  ) => void;
  removeColumn: (id: string) => void;
};

const TableContext = React.createContext<TableContextType>({
  dataSource: [],
  currentFilterFields: [],
  onChangeFilterField: () => {
    /* Empty */
  },
  currentSortField: null,
  currentSortDirection: false,
  onChangeSortField: () => {
    /* Empty */
  },
  addColumn: () => {
    /* Empty */
  },
  updateColumn: () => {
    /* Empty */
  },
  removeColumn: () => {
    /* Empty */
  },
});

const defaultPaginationRangeOptions = [20, 50, 100, 200];

function Table<
  T extends {
    // Empty
  }
>({
  children,
  dataSource,
  rowKey,
  expandedRecord,
  renderExpandedRow,
  onClickRow,
  pagination,
  isLoading = false,
  fixedLayout = false,
  tableContainerClassName = '',
  onPaginationLoadingOrUpdating,
  defaultPageSize = 10,
  noDataHeight,
  showArrows = true,
  defaultPaginationRange = defaultPaginationRangeOptions,
  ...fspProps
}: TableProps<T>) {
  const [highlightRow, setHighlightRow] = React.useState<number | null>(null);

  const unsetHighlightRow = React.useCallback(() => {
    setHighlightRow(null);
  }, []);

  const {
    clientPageSize,
    clientPageOffset,
    clientPaginationHandler,
  } = useTableClientPagination(defaultPageSize);

  const {
    clientSortingField,
    clientSortingDirection,
    clientSortingReversed,
    clientOnChangeSorterHandler,
  } = useTableClientSort();

  const {
    clientFilterField,
    clientFilteringItems,
    clientOnChangeFilterHandler,
  } = useTableClientFilter();

  const [columns, setColumns] = React.useState<
    { id: string; props?: ColumnProps<T> }[]
  >([]);

  const addColumn = React.useCallback((id: string) => {
    setColumns(prev =>
      prev.map(item => item.id).includes(id) ? prev : [...prev, { id }]
    );
  }, []);

  const updateColumn = React.useCallback(
    (id: string, props: ColumnProps<T>) => {
      setColumns(prev => {
        const index = prev.findIndex(item => item.id === id);
        if (index > -1) {
          return arrayReplace(prev, index, { id, props });
        } else {
          throw new Error(`The column "${id}" to be updated is never added.`);
        }
      });
    },
    []
  );

  const removeColumn = React.useCallback((id: string) => {
    setColumns(prev => prev.filter(item => item.id !== id));
  }, []);

  const checkFieldKeys = React.useCallback(
    function (key: string): key is Exclude<keyof T, number | symbol> {
      if (dataSource.length === 0) {
        return true;
      } else {
        return Object.keys(dataSource[0]).includes(key);
      }
    },
    [dataSource]
  );

  const clientSideFilteredData = React.useMemo(() => {
    if (fspProps.onServerFSP) {
      return dataSource;
    }
    if (
      clientFilterField &&
      checkFieldKeys(clientFilterField) &&
      clientFilteringItems.length > 0
    ) {
      return dataSource.filter(item =>
        clientFilteringItems.includes(String(item[clientFilterField]))
      );
    }
    return dataSource;
  }, [
    checkFieldKeys,
    clientFilterField,
    clientFilteringItems,
    dataSource,
    fspProps.onServerFSP,
  ]);

  const processedData = React.useMemo(() => {
    if (fspProps.onServerFSP) {
      // Server side does the job. We don't have to process
      return dataSource;
    } else {
      let finalData = clientSideFilteredData;
      // Filter

      // Sort
      if (
        clientSortingField &&
        checkFieldKeys(clientSortingField) &&
        clientSortingDirection
      ) {
        finalData = arraySort(
          finalData,
          (a, b) => {
            const fieldA = a[clientSortingField];
            const fieldB = b[clientSortingField];
            if (typeof fieldA === 'number' && typeof fieldB === 'number') {
              return (fieldA - fieldB) * (clientSortingReversed ? -1 : 1);
            } else {
              return clientSortingReversed
                ? fieldA > fieldB
                  ? -1
                  : 1
                : fieldA < fieldB
                ? -1
                : 1;
            }
          },
          clientSortingDirection
        );
      }
      // Pagination
      if (pagination) {
        finalData = finalData.filter(
          (
            _,
            index // Pagination
          ) =>
            index >= clientPageOffset &&
            index < clientPageOffset + clientPageSize
        );
      }

      return finalData;
    }
  }, [
    checkFieldKeys,
    clientPageOffset,
    clientPageSize,
    clientSortingDirection,
    clientSortingField,
    clientSortingReversed,
    clientSideFilteredData,
    dataSource,
    fspProps.onServerFSP,
    pagination,
  ]);

  const containerRef = React.useRef<HTMLDivElement>(null);

  const scrollToRight = React.useCallback(() => {
    const { current } = containerRef;
    if (current) {
      current.scrollBy(100, 0);
    }
  }, []);

  const scrollToLeft = React.useCallback(() => {
    const { current } = containerRef;
    if (current) {
      current.scrollBy(-100, 0);
    }
  }, []);

  const allColumns = React.useMemo(() => {
    return columns.map(item => item.props);
  }, [columns]);

  const leftColumns = React.useMemo(
    () => allColumns.filter(c => c?.fixed === 'left'),
    [allColumns]
  );
  const rightColumns = React.useMemo(
    () => allColumns.filter(c => c?.fixed === 'right'),
    [allColumns]
  );
  const middleColumns = React.useMemo(() => allColumns.filter(c => !c?.fixed), [
    allColumns,
  ]);

  const serverOnChangeSorterHandler = React.useCallback(
    (field: string, _: boolean, binary: boolean) => {
      if (fspProps.onServerFSP) {
        const {
          ouId,
          treeId,
          onServerFSP,
          sortingDirection,
          sortingField,
          ...otherProps
        } = fspProps;

        let newSortingDirection: 'asc' | 'desc' | false;

        if (binary) {
          if (sortingDirection === 'asc' || sortingDirection === false) {
            newSortingDirection = 'desc';
          } else {
            newSortingDirection = 'asc';
          }
        } else {
          if (sortingField !== field || sortingDirection === false) {
            newSortingDirection = 'asc';
          } else if (sortingDirection === 'asc') {
            newSortingDirection = 'desc';
          } else {
            newSortingDirection = false;
          }
        }

        onServerFSP(ouId, treeId, {
          ...otherProps,
          sortingField: field,
          sortingDirection: newSortingDirection,
        });
      } else {
        throw new Error(
          'onServerFSP must be specified to use server-side pagination.'
        );
      }
    },
    [fspProps]
  );

  const serverOnChangeFilterHandler = React.useCallback(
    (fieldName: string, values: string[]) => {
      if (fspProps.onServerFSP) {
        const {
          ouId,
          treeId,
          onServerFSP,
          filterFields,
          ...otherProps
        } = fspProps;
        onServerFSP(ouId, treeId, {
          ...otherProps,
          filterFields: [
            ...filterFields.filter(item => item.fieldName !== fieldName),
            { fieldName, values, type: FilterType.IN },
          ],
        });
      } else {
        throw new Error(
          'onServerFSP must be specified to use server-side pagination.'
        );
      }
    },
    [fspProps]
  );

  const serverPaginationHandler = React.useCallback(
    (pageOffset: number, pageSize: number) => {
      if (fspProps.onServerFSP) {
        const { ouId, treeId, onServerFSP, ...otherProps } = fspProps;
        onServerFSP(ouId, treeId, {
          ...otherProps,
          pageOffset,
          pageSize,
        });
      } else {
        throw new Error(
          'onServerFSP must be specified to use server-side pagination.'
        );
      }
    },
    [fspProps]
  );

  const contextValue: TableContextType = React.useMemo(() => {
    if (fspProps.onServerFSP) {
      const { filterFields, sortingField, sortingDirection } = fspProps;
      return {
        dataSource,
        currentFilterFields: filterFields,
        currentSortField: sortingField,
        currentSortDirection: sortingDirection,
        onChangeSortField: serverOnChangeSorterHandler,
        onChangeFilterField: serverOnChangeFilterHandler,
        addColumn,
        updateColumn,
        removeColumn,
      };
    } else {
      return {
        dataSource,
        currentFilterFields: clientFilterField
          ? [
              {
                fieldName: clientFilterField,
                values: clientFilteringItems,
                type: FilterType.IN,
              },
            ]
          : [],
        currentSortField: clientSortingField,
        currentSortDirection: clientSortingDirection,
        onChangeSortField: clientOnChangeSorterHandler,
        onChangeFilterField: clientOnChangeFilterHandler,
        addColumn,
        updateColumn,
        removeColumn,
      };
    }
  }, [
    fspProps,
    dataSource,
    serverOnChangeSorterHandler,
    serverOnChangeFilterHandler,
    addColumn,
    updateColumn,
    removeColumn,
    clientFilterField,
    clientFilteringItems,
    clientSortingField,
    clientSortingDirection,
    clientOnChangeSorterHandler,
    clientOnChangeFilterHandler,
  ]);
  const [leftBoxOpacity, rightBoxOpacity] = useScrollBasedOpacity(
    containerRef.current
  );

  const styles = useStyles(styleRef);

  return (
    <TableContext.Provider value={contextValue}>
      <div
        className={`${styles.wrapper} ${tableContainerClassName}`}
        ref={containerRef}
      >
        <div hidden={true}>{children}</div>
        <div className={cx(styles.sticky, styles.stickyLeft)}>
          {leftColumns.length > 0
            ? generateTable({
                isLoading,
                dataSource: processedData,
                columns: leftColumns,
                rowKey,
                pageSize: fspProps.onServerFSP
                  ? fspProps.pageSize
                  : clientPageSize,
                onClickRow,
                setHighlightRow,
                unsetHighlightRow,
                highlightRow,
                styles,
                fixedLayout,
                noDataHeight,
              })
            : null}
          {!showArrows ? null : (
            <motion.div
              className={styles.leftBox}
              style={leftBoxOpacity}
              onClick={scrollToLeft}
            >
              <Icon
                name={ICON_NAMES.ARROW1_LEFT}
                className={styles.shadowBoxText}
              />
            </motion.div>
          )}
        </div>
        {generateTable({
          isLoading,
          dataSource: processedData,
          columns: middleColumns,
          rowKey,
          expandedRecord,
          renderExpandedRow,
          onClickRow,
          pageSize: fspProps.onServerFSP ? fspProps.pageSize : clientPageSize,
          setHighlightRow,
          unsetHighlightRow,
          highlightRow,
          showShowNoData: true,
          styles,
          fixedLayout,
          noDataHeight,
        })}
        <div className={cx(styles.sticky, styles.stickyRight)}>
          {rightColumns.length > 0
            ? generateTable({
                isLoading,
                dataSource: processedData,
                columns: rightColumns,
                rowKey,
                pageSize: fspProps.onServerFSP
                  ? fspProps.pageSize
                  : clientPageSize,
                onClickRow,
                setHighlightRow,
                unsetHighlightRow,
                highlightRow,
                styles,
                fixedLayout,
                noDataHeight,
              })
            : null}
          {!showArrows ? null : (
            <motion.div
              className={styles.rightBox}
              style={rightBoxOpacity}
              onClick={scrollToRight}
            >
              <Icon
                name={ICON_NAMES.ARROW1_RIGHT}
                className={styles.shadowBoxText}
              />
            </motion.div>
          )}
        </div>
      </div>
      {pagination ? (
        <div style={{ marginTop: 12 }}>
          {fspProps.onServerFSP ? (
            <Pagination
              totalItems={fspProps.totalCount}
              pageSize={fspProps.pageSize}
              offset={fspProps.pageOffset}
              onPaginate={serverPaginationHandler}
              pageSizeSelector={fspProps.paginationDropdown}
              onPaginationLoadingOrUpdating={onPaginationLoadingOrUpdating}
              defaultPaginationRange={defaultPaginationRange}
            />
          ) : (
            <Pagination
              totalItems={dataSource.length}
              filteredItems={
                clientSideFilteredData.length !== dataSource.length
                  ? clientSideFilteredData.length
                  : undefined
              }
              onPaginationLoadingOrUpdating={onPaginationLoadingOrUpdating}
              pageSize={clientPageSize}
              offset={clientPageOffset}
              onPaginate={clientPaginationHandler}
              defaultPaginationRange={defaultPaginationRange}
            />
          )}
        </div>
      ) : null}
    </TableContext.Provider>
  );
}

interface SorterProps {
  field: string;
  activeField: string | null;
  activeDirection: 'asc' | 'desc' | false;
  onClick: (field: string) => void;
}

interface TableSorterProps<
  T extends {
    // Empty
  }
> {
  field: Exclude<keyof T, number | symbol>;
  reverse?: boolean;
  binary?: boolean;
}

interface TableFilterProps<
  T extends {
    // Empty
  }
> {
  field: Exclude<keyof T, number | symbol>;
  filterList?: ColumnFilterItem[];
  filterListMapping?: (value: string) => string;
}

export function Sorter({
  activeDirection,
  activeField,
  onClick,
  field,
}: SorterProps) {
  const active = field === activeField && activeDirection !== false;

  const iconName = active
    ? activeDirection === 'asc'
      ? ICON_NAMES.SORT_UP
      : activeDirection === 'desc'
      ? ICON_NAMES.SORT_DOWN
      : ICON_NAMES.SORT_NORMAL
    : ICON_NAMES.SORT_NORMAL;

  const clickHandler = React.useCallback(() => {
    onClick(field);
  }, [onClick, field]);

  const styles = useStyles(styleRef);

  return (
    <div
      className={cx(styles.sorterFilterContainer, {
        [styles.sorterFilterContainerSelected]: active,
      })}
      onClick={clickHandler}
    >
      <Icon name={iconName} />
    </div>
  );
}

export function TableSorter<T>({
  field,
  reverse = false,
  binary = false,
}: TableSorterProps<T>) {
  const {
    currentSortField,
    currentSortDirection,
    onChangeSortField,
  } = React.useContext(TableContext);

  const onClickHandler = React.useCallback(
    (value: string) => {
      onChangeSortField(value, reverse, binary);
    },
    [binary, onChangeSortField, reverse]
  );

  return (
    <Sorter
      onClick={onClickHandler}
      field={field}
      activeField={currentSortField}
      activeDirection={currentSortDirection}
    />
  );
}

interface FilterProps {
  filterList: ColumnFilterItem[];
  selectedFilters: string[];
  onChange: (newValues: string[]) => void;
}

const FilterContext = React.createContext<{
  values: string[];
  onChange: (newValues: string[]) => void;
  maxReached: boolean;
  minReached: boolean;
}>({
  values: [],
  onChange: () => {
    /* Empty */
  },
  maxReached: false,
  minReached: false,
});

const FilterMenuItem: React.FC<{ item: ColumnFilterItem }> = ({ item }) => {
  const [selected, onClick] = useCheckboxSelection(FilterContext, item.value);
  return (
    <MenuItem
      key={item.value}
      multiple={true}
      selected={selected}
      onClick={onClick}
    >
      {item.text}
    </MenuItem>
  );
};
export const Filter: React.FC<FilterProps> = ({
  filterList,
  selectedFilters,
  onChange,
}) => {
  const styles = useStyles(styleRef);
  const { isOpen, toggleDropdown, hideDropdown } = useDropdownUI();

  const validValue = selectedFilters.filter(value =>
    filterList.map(item => item.value).includes(value)
  );

  const trigger = React.useMemo(
    () => (
      <div
        className={cx(styles.sorterFilterContainer, {
          [styles.sorterFilterContainerSelected]:
            isOpen ||
            (validValue.length > 0 && validValue.length < filterList.length),
        })}
        onClick={e => {
          e.preventDefault();
          toggleDropdown();
        }}
      >
        <Icon name={ICON_NAMES.FILTER} />
      </div>
    ),
    [
      filterList.length,
      isOpen,
      styles.sorterFilterContainer,
      styles.sorterFilterContainerSelected,
      toggleDropdown,
      validValue.length,
    ]
  );

  const contextValue = React.useMemo(
    () => ({
      values: selectedFilters,
      onChange,
      minReached: false,
      maxReached: false,
    }),
    [onChange, selectedFilters]
  );

  const t = useI18N();

  return (
    <MotionTether
      isOpen={isOpen}
      renderTrigger={trigger}
      onClickOutside={hideDropdown}
      triggerAttachment={Pos.BottomRight}
      contentAttachment={Pos.TopRight}
    >
      <Menu
        key="menu"
        variants={dropdownVariants}
        initial="hidden"
        animate={isOpen ? 'visible' : 'hidden'}
        exit="hidden"
      >
        <MenuItem
          value="all"
          multiple={true}
          selected={
            validValue.length === 0
              ? false
              : validValue.length === filterList.length
              ? true
              : 'indeterminate'
          }
          onClick={() => {
            if (validValue.length < filterList.length) {
              onChange(filterList.map(i => i.value));
            } else {
              onChange([]);
            }
          }}
        >
          {t('FILTER_SELECT_ALL')}
        </MenuItem>
        <FilterContext.Provider value={contextValue}>
          {filterList.map(item => (
            <FilterMenuItem key={item.value} item={item} />
          ))}
        </FilterContext.Provider>
      </Menu>
    </MotionTether>
  );
};

export function TableFilter<T>({
  field,
  filterList,
  filterListMapping,
}: TableFilterProps<T>) {
  const {
    dataSource,
    currentFilterFields,
    onChangeFilterField,
  } = React.useContext(TableContext);

  const mappedFilterList: ColumnFilterItem[] = React.useMemo(() => {
    if (filterList) {
      return filterList;
    } else {
      const uniqueValues = Array.from(
        new Set((dataSource as T[]).map(item => String(item[field])))
      );
      return uniqueValues.map(item => {
        return {
          value: item,
          text: filterListMapping ? filterListMapping(item) : item,
        };
      });
    }
  }, [dataSource, field, filterList, filterListMapping]);

  const selected = currentFilterFields.find(item => item.fieldName === field);
  return (
    <Filter
      filterList={mappedFilterList}
      selectedFilters={
        selected &&
        [FilterType.IN, FilterType.EQUAL, FilterType.NOT_EXISTS].includes(
          selected.type
        )
          ? // @ts-expect-error
            selected.values
          : []
      }
      onChange={list => {
        onChangeFilterField(field, list);
      }}
    />
  );
}

export const Column: <
  T extends {
    // Empty
  }
>(
  props: ColumnProps<T>
) => null = props => {
  const { addColumn, updateColumn, removeColumn } = React.useContext(
    TableContext
  );

  // Always prefer id,
  // later id will be the mandatory prop, as title is not stable.
  // title could be some localized string changed by user locales
  const key = props.id
    ? props.id
    : typeof props.title === 'string'
    ? props.title
    : undefined;

  React.useEffect(() => {
    if (key) {
      addColumn(key);
      return () => {
        removeColumn(key);
      };
    } else {
      throw new Error(
        'If Title is JSX. A unique string `id` must be provided.'
      );
    }
  }, [addColumn, removeColumn, key]);

  React.useEffect(() => {
    if (key) {
      updateColumn(key, props);
    } else {
      throw new Error(
        'If Title is JSX. A unique string `id` must be provided.'
      );
    }
  }, [key, props, updateColumn]);

  return null;
};

export default Table;
