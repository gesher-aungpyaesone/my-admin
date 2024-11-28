// jp.js
import japaneseMessages from '@bicstone/ra-language-japanese';

const jpfull = {
  ra: {
    ...japaneseMessages.ra,
  },
  resources: {
    permission: {
      name: '権限',
      list: '権限一覧',
      fields: {
        id: 'ID',
        name: '名前',
        resource: {
          name: 'リソース',
        },
        type: {
          name: 'タイプ',
        },
        created_at: '作成日時',
        created_by_id: '作成者',
      },
    },
    staff: {
      name: 'スタッフ',
      list: 'スタッフ一覧',
      show: {
        tab: {
          profile: 'プロフィール',
          permission: '権限',
          history: '履歴',
        },
        fields: {
          permissions: '権限',
          assign_btn_name: '任命する',
        },
        labels: {
          assign_permissions_lbl: '権限割り当て',
          assigned_permission_lbl: '割り当てられた権限',
        },
      },
      fields: {
        id: 'ID',
        first_name: '名',
        last_name: '姓',
        email: 'メール',
        is_root: 'ルート',
        department: '部署',
        position_id: '役職',
        created_at: '作成日時',
        updated_at: '更新日時',
        created_by_id: '作成者',
        updated_by_id: '更新者',
      },
    },
    'staff-position': {
      name: '役職',
      list: '役職一覧',
      show: {
        tab: {
          detail: '詳細',
          history: '履歴',
        },
      },
      tabs: {
        info: '基本情報',
        members: 'メンバー',
        history: '履歴',
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
      titles: {
        create: '役職作成',
      },
    },
    group: {
      name: 'グループ',
      list: 'グループ一覧',
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
