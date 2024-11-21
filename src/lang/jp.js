// jp.js
import japaneseMessages from '@bicstone/ra-language-japanese';

const jpfull = {
  ra: {
    ...japaneseMessages.ra,
  },
  resources: {
    staff: {
      name: 'スタッフ',
      list: 'スタッフ一覧',
      show: {
        tab: {
          profile: 'プロフィール',
          permission: '権限',
          history: '履歴',
        },
      },
      fields: {
        id: 'ID',
        first_name: '名',
        last_name: '姓',
        email: 'メール',
        department: '部署',
        position_id: '役職',
        created_at: '作成日時',
        updated_at: '更新日時',
        created_by_id: '作成者',
        updated_by_id: '更新者',
      },
    },
    'staff-position': {
      name: 'スタッフの役職',
      list: '役職一覧',
      show: {
        tab: {
          detail: '詳細',
          history: '履歴',
        },
      },
      fields: {
        id: 'ID',
        name: '役職名',
        description: '役職説明',
        created_at: '作成日時',
        updated_at: '更新日時',
        created_by_id: '作成者',
        updated_by_id: '更新者',
      },
    },
  },
  pages: {
    auth: {
      login: {
        name: 'ログイン',
        fields: {
          email: 'メール',
          password: 'パスワード',
          remember_me: 'ログイン状態を保持する',
          login_btn_name: 'ログイン',
        },
      },
    },
  },
  'Invalid Credentials': '認証情報が無効です。再試行してください。',
  'staff not found': 'スタッフは登録されていないか、削除されています。',
};

export default jpfull;
