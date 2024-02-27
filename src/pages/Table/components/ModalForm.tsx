import {
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import { Modal } from 'antd';
import React from 'react';

export interface FormValueType extends Partial<API.UserInfo> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface ModalFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  detailModalVisible: boolean;
  values: Partial<API.UserInfo>;
}


const ModalForm: React.FC<ModalFormProps> = (props) => (
  <Modal
    width={640}
    bodyStyle={{ padding: '32px 40px 48px' }}
    destroyOnClose
    title="详情"
    open={props.detailModalVisible}
    onCancel={() => props.onCancel()}
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Modal>
);

export default ModalForm;
