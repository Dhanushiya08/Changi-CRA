export   interface Column {
    title: string;
    dataIndex: string;
    key: string;
    render?: (text: any, record: any) => any;
    className?: string;
  }