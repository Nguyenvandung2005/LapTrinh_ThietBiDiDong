import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Bai09Screen from './src/screens/Bai09Screen';
import Bai10Screen from './src/screens/Bai10Screen';
import Bai11Screen from './src/screens/Bai11Screen';
import Bai12Screen from './src/screens/Bai12Screen';
import Bai13Screen from './src/screens/Bai13Screen';
import Bai14Screen from './src/screens/Bai14Screen';
import Bai15Screen from './src/screens/Bai15Screen';

type Page =
  | 'home'
  | 'bai09'
  | 'bai10'
  | 'bai11'
  | 'bai12'
  | 'bai13'
  | 'bai14'
  | 'bai15';

export default function App() {
  const [page, setPage] = useState<Page>('home');

  if (page === 'bai09') {
    return (
      <PageLayout title="Bài 9" setPage={setPage}>
        <Bai09Screen />
      </PageLayout>
    );
  }

  if (page === 'bai10') {
    return (
      <PageLayout title="Bài 10" setPage={setPage}>
        <Bai10Screen />
      </PageLayout>
    );
  }

  if (page === 'bai11') {
    return (
      <PageLayout title="Bài 11" setPage={setPage}>
        <Bai11Screen />
      </PageLayout>
    );
  }

  if (page === 'bai12') {
    return (
      <PageLayout title="Bài 12" setPage={setPage}>
        <Bai12Screen />
      </PageLayout>
    );
  }

  if (page === 'bai13') {
    return (
      <PageLayout title="Bài 13" setPage={setPage}>
        <Bai13Screen />
      </PageLayout>
    );
  }

  if (page === 'bai14') {
    return (
      <PageLayout title="Bài 14" setPage={setPage}>
        <Bai14Screen />
      </PageLayout>
    );
  }

  if (page === 'bai15') {
    return (
      <PageLayout title="Bài 15" setPage={setPage}>
        <Bai15Screen />
      </PageLayout>
    );
  }

  return <Home setPage={setPage} />;
}

function Home({
  setPage,
}: {
  setPage: (page: Page) => void;
}) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.home}>
        <Text style={styles.title}>Bài tập TypeScript</Text>

        <Text style={styles.subtitle}>
          API và xử lý bất đồng bộ
        </Text>

        <MenuButton
          title="Bài 9 - Fetch API"
          onPress={() => setPage('bai09')}
        />

        <MenuButton
          title="Bài 10 - Optional Chaining"
          onPress={() => setPage('bai10')}
        />

        <MenuButton
          title="Bài 11 - Async Parameters"
          onPress={() => setPage('bai11')}
        />

        <MenuButton
          title="Bài 12 - Error Handling"
          onPress={() => setPage('bai12')}
        />

        <MenuButton
          title="Bài 13 - Generic"
          onPress={() => setPage('bai13')}
        />

        <MenuButton
          title="Bài 14 - Generic Interface"
          onPress={() => setPage('bai14')}
        />

        <MenuButton
          title="Bài 15 - Pull to Refresh"
          onPress={() => setPage('bai15')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function PageLayout({
  title,
  setPage,
  children,
}: {
  title: string;
  setPage: (page: Page) => void;
  children: React.ReactNode;
}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => setPage('home')}
        >
          <Text style={styles.back}>← Trang chủ</Text>
        </TouchableOpacity>

        <Text style={styles.pageTitle}>{title}</Text>

        <View style={styles.space} />
      </View>

      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

function MenuButton({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.menuButton}
      onPress={onPress}
    >
      <Text style={styles.menuText}>{title}</Text>

      <Text style={styles.arrow}>→</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  home: {
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222222',
    marginTop: 20,
  },

  subtitle: {
    color: '#777777',
    marginTop: 6,
    marginBottom: 25,
  },

  menuButton: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  menuText: {
    fontSize: 16,
    color: '#222222',
  },

  arrow: {
    fontSize: 18,
    color: '#555555',
  },

  topBar: {
    height: 55,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },

  back: {
    color: '#333333',
    fontSize: 14,
  },

  pageTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },

  space: {
    width: 70,
  },

  content: {
    flex: 1,
  },
});