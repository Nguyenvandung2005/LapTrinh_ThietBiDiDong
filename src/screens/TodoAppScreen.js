import React, {
    createContext,
    useContext,
    useState,
    useReducer,
    useMemo,
    useCallback,
    useEffect,
    memo,
  } from 'react';
  import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    Pressable,
    StyleSheet,
  } from 'react-native';
  
  // --- BƯỚC 4: useContext QUẢN LÝ THEME SÁNG / TỐI ---
  const ThemeContext = createContext({
    isDark: false,
    toggleTheme: () => {},
  });
  
  // --- BƯỚC 1 & 2: useReducer QUẢN LÝ DANH SÁCH CÔNG VIỆC ---
  const initialTodos = [
    { id: '1', title: 'Học React Native Hooks', completed: true },
    { id: '2', title: 'Làm bài tập Tuần 03', completed: false },
    { id: '3', title: 'Ôn tập useMemo và useCallback', completed: false },
  ];
  
  function todoReducer(state, action) {
    switch (action.type) {
      case 'ADD_TODO':
        return [
          ...state,
          {
            id: Date.now().toString(),
            title: action.payload,
            completed: false,
          },
        ];
  
      case 'TOGGLE_TODO':
        return state.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        );
  
      case 'DELETE_TODO':
        return state.filter((todo) => todo.id !== action.payload);
  
      default:
        return state;
    }
  }
  
  // Component con hiển thị từng công việc (Tối ưu bằng React.memo)
  const TodoItem = memo(function TodoItem({ item, onToggle, onDelete, isDark }) {
    return (
      <View
        style={[
          styles.todoItem,
          { backgroundColor: isDark ? '#2D3748' : '#FFFFFF' },
        ]}
      >
        <Pressable
          style={styles.todoContent}
          onPress={() => onToggle(item.id)}
        >
          <Text style={[styles.checkbox, item.completed && styles.checkboxDone]}>
            {item.completed ? '✓' : '○'}
          </Text>
          <Text
            style={[
              styles.todoTitle,
              { color: isDark ? '#F7FAFC' : '#1F2937' },
              item.completed && styles.todoDone,
            ]}
          >
            {item.title}
          </Text>
        </Pressable>
  
        <Pressable
          style={styles.deleteBtn}
          onPress={() => onDelete(item.id)}
        >
          <Text style={styles.deleteText}>Xóa</Text>
        </Pressable>
      </View>
    );
  });
  
  // --- NỘI DUNG CHÍNH CỦA ỨNG DỤNG ---
  function MainTodoApp() {
    const { isDark, toggleTheme } = useContext(ThemeContext);
  
    // Bước 3: useState quản lý ô nhập công việc và từ khóa lọc
    const [inputText, setInputText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
  
    // Bước 2: useReducer quản lý danh sách công việc
    const [todos, dispatch] = useReducer(todoReducer, initialTodos);
  
    // Bước 7: useEffect theo dõi và ghi nhận sự thay đổi số lượng công việc
    useEffect(() => {
      console.log(`Danh sách hiện có ${todos.length} công việc`);
    }, [todos.length]);
  
    // Bước 6: useCallback ổn định tham chiếu các hàm chuyển xuống component con
    const handleToggle = useCallback((id) => {
      dispatch({ type: 'TOGGLE_TODO', payload: id });
    }, []);
  
    const handleDelete = useCallback((id) => {
      dispatch({ type: 'DELETE_TODO', payload: id });
    }, []);
  
    // Hàm thêm công việc
    const handleAddTodo = () => {
      if (!inputText.trim()) return;
      dispatch({ type: 'ADD_TODO', payload: inputText.trim() });
      setInputText('');
    };
  
    // Bước 5: useMemo để lọc công việc theo từ khóa và tính số việc chưa hoàn thành
    const filteredTodos = useMemo(() => {
      return todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
      );
    }, [todos, searchQuery]);
  
    const activeCount = useMemo(() => {
      return todos.filter((todo) => !todo.completed).length;
    }, [todos]);
  
    // Bộ màu theo giao diện sáng / tối
    const themeStyles = {
      container: { backgroundColor: isDark ? '#1A202C' : '#F9FAFB' },
      text: { color: isDark ? '#F7FAFC' : '#111827' },
      subText: { color: isDark ? '#A0AEC0' : '#4B5563' },
      card: { backgroundColor: isDark ? '#2D3748' : '#FFFFFF' },
      input: {
        backgroundColor: isDark ? '#4A5568' : '#FFFFFF',
        color: isDark ? '#FFFFFF' : '#111827',
        borderColor: isDark ? '#718096' : '#D1D5DB',
      },
    };
  
    return (
      <View style={[styles.container, themeStyles.container]}>
        {/* Tiêu đề & Nút đổi Theme */}
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.headerTitle, themeStyles.text]}>
              Quản Lý Công Việc
            </Text>
            <Text style={[styles.badgeText, themeStyles.subText]}>
              Chưa hoàn thành: <Text style={styles.badgeHighlight}>{activeCount}</Text> việc
            </Text>
          </View>
  
          <Pressable
            onPress={toggleTheme}
            style={[
              styles.themeBtn,
              { backgroundColor: isDark ? '#ED8936' : '#4A5568' },
            ]}
          >
            <Text style={styles.themeBtnText}>{isDark ? '☀️ Sáng' : '🌙 Tối'}</Text>
          </Pressable>
        </View>
  
        {/* Ô tìm kiếm */}
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="🔍 Tìm kiếm công việc..."
          placeholderTextColor={isDark ? '#A0AEC0' : '#9CA3AF'}
          style={[styles.input, themeStyles.input]}
        />
  
        {/* Ô thêm công việc mới */}
        <View style={styles.addRow}>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Nhập công việc mới..."
            placeholderTextColor={isDark ? '#A0AEC0' : '#9CA3AF'}
            style={[styles.input, styles.addInput, themeStyles.input]}
          />
          <Button title="Thêm" color="#2563EB" onPress={handleAddTodo} />
        </View>
  
        {/* Danh sách công việc */}
        <FlatList
          data={filteredTodos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TodoItem
              item={item}
              onToggle={handleToggle}
              onDelete={handleDelete}
              isDark={isDark}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, themeStyles.subText]}>
                {searchQuery
                  ? 'Không tìm thấy công việc phù hợp'
                  : 'Hiện chưa có công việc nào'}
              </Text>
            </View>
          }
        />
      </View>
    );
  }
  
  export default function TodoAppScreen() {
    const [isDark, setIsDark] = useState(false);
  
    const toggleTheme = () => {
      setIsDark((prev) => !prev);
    };
  
    return (
      <ThemeContext.Provider value={{ isDark, toggleTheme }}>
        <MainTodoApp />
      </ThemeContext.Provider>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: '800',
    },
    badgeText: {
      fontSize: 14,
      marginTop: 2,
      fontWeight: '500',
    },
    badgeHighlight: {
      color: '#E11D48',
      fontWeight: '700',
    },
    themeBtn: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 8,
    },
    themeBtnText: {
      color: '#FFFFFF',
      fontWeight: '700',
      fontSize: 13,
    },
    input: {
      height: 46,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      fontSize: 15,
    },
    addRow: {
      flexDirection: 'row',
      gap: 8,
      marginVertical: 12,
    },
    addInput: {
      flex: 1,
    },
    todoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 14,
      borderRadius: 10,
      marginBottom: 8,
      elevation: 1,
    },
    todoContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      gap: 10,
    },
    checkbox: {
      fontSize: 18,
      color: '#6B7280',
      fontWeight: '700',
      width: 24,
      textAlign: 'center',
    },
    checkboxDone: {
      color: '#16A34A',
    },
    todoTitle: {
      fontSize: 15,
      fontWeight: '600',
      flex: 1,
    },
    todoDone: {
      textDecorationLine: 'line-through',
      color: '#9CA3AF',
    },
    deleteBtn: {
      backgroundColor: '#FEE2E2',
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 6,
    },
    deleteText: {
      color: '#DC2626',
      fontWeight: '700',
      fontSize: 12,
    },
    emptyContainer: {
      paddingVertical: 32,
      alignItems: 'center',
    },
    emptyText: {
      fontStyle: 'italic',
      fontSize: 14,
    },
  });