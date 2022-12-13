<Table<MaintenanceEventData>
isLoading={isLoadingLiftData}
dataSource={tableData
  .sort((a, b) =>
    a.timestamp.toString().localeCompare(b.timestamp.toString())
  )
  .reverse()}
pagination={true}
fixedLayout={true}
onClickRow={rowClickHandler}
>
<Column<MaintenanceEventData>
  title={t('LABEL_SERIAL_NUMBER')}
  width={16}
>
  {d => (
    <>
      <Tooltip
        className={styles.tooltipContainer}
        childrenClassName={styles.tooltipChildren}
        title={<div className={styles.tooltipContent}>{d.serial}</div>}
      >
        {d.serial}
      </Tooltip>
    </>
  )}
</Column>
<Column<MaintenanceEventData> title={t('LABEL_NAME')} width={13}>
  {d => (
    <>
      <Tooltip
        className={styles.tooltipContainer}
        childrenClassName={styles.tooltipChildren}
        title={
          <div className={styles.tooltipContent}>{d.deviceName}</div>
        }
      >
        {d.deviceName}
      </Tooltip>
    </>
  )}
</Column>
<Column<MaintenanceEventData> title={t('LABEL_CATEGORY')} width={10}>
  {d => (
    <>
      <Tooltip
        className={styles.tooltipContainer}
        childrenClassName={styles.tooltipChildren}
        title={
          <div className={styles.tooltipContent}>{d.category}</div>
        }
      >
        {d.category}
      </Tooltip>
    </>
  )}
</Column>
<Column<MaintenanceEventData> title={t('LABEL_EVENT_NAME')} width={20}>
  {d => (
    <>
      <Tooltip
        className={styles.tooltipContainer}
        childrenClassName={styles.tooltipChildren}
        title={
          <div className={styles.tooltipContent}>{d.eventName}</div>
        }
      >
        {d.eventName}
      </Tooltip>
    </>
  )}
</Column>
<Column<MaintenanceEventData>
  title={t('LABEL_CREATION_TIME')}
  width={15}
>
  {d => (
    <>
      <Tooltip
        className={styles.tooltipContainer}
        childrenClassName={styles.tooltipChildren}
        title={
          <div className={styles.tooltipContent}>
            {dayjs(Number(d.timestamp)).format(
              standardDateTimeNoSecondFormat
            )}
          </div>
        }
      >
        {dayjs(Number(d.timestamp)).format(
          standardDateTimeNoSecondFormat
        )}
      </Tooltip>
    </>
  )}
</Column>
<Column<MaintenanceEventData>
  title={t('LABEL_ASSIGNEE')}
  width={10}
  accessory={<TableFilter field="assignee" />}
>
  {d => (
    <>
      <Tooltip
        className={styles.tooltipContainer}
        childrenClassName={styles.tooltipChildren}
        title={
          <div className={styles.tooltipContent}>{d.assignee}</div>
        }
      >
        {d.assignee}
      </Tooltip>
    </>
  )}
</Column>
<Column<MaintenanceEventData>
  title={t('LABEL_PRIORITY')}
  width={10}
  accessory={<TableSorter field={'priority'} />}
>
  {d => (
    <>
      <Tooltip
        className={styles.tooltipContainer}
        childrenClassName={styles.tooltipChildren}
        title={
          <div className={styles.tooltipContent}>{d.priority}</div>
        }
      >
        {d.priority}
      </Tooltip>
    </>
  )}
</Column>
<Column<MaintenanceEventData> title={t('LABEL_STATUS')} width={10}>
  {d => (
    <>
      <Tooltip
        className={styles.tooltipContainer}
        childrenClassName={styles.tooltipChildren}
        title={<div className={styles.tooltipContent}>{d.status}</div>}
      >
        {d.status}
      </Tooltip>
    </>
  )}
</Column>
<ActionsColumn
  title={' '}
  width={10}
  onClickForEdit={triggerEditModalHandler}
  onClickForDelete={triggerDeleteModalHandler}
/>
{tableData.length > 0 ? (
  <div>
    <EditInfoModal
      dataInfo={tableData[editGroupId]}
      isOpen={showEditModal}
      updateModalDisplay={updateEditModalDisplay}
      enterAsEdit={enterAsEdit}
    />
    <DeleteInfoModal
      isOpen={showDeleteModal}
      dataInfo={tableData[deleteGroupId]}
      onCancel={() => setShowDeleteModal(false)}
      updateModalDisplay={updateDeleteModalDisplay}
    />
  </div>
) : null}
</Table>