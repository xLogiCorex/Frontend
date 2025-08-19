import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c7ecee',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  header: {
    fontSize: 28,
    marginBottom: 14,
    fontWeight: 'bold',
    color: '#535c68',
  },
  textInput: {
    width: '80%',
    height: 48,
    backgroundColor: '#dfe6e9',
    borderRadius: 15,
    paddingHorizontal: 16,
    marginBottom: 8,
    fontSize: 16,
    color: '#2f3640',
  },
  passwordRow: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dfe6e9',
    borderRadius: 15,
    marginBottom: 8,
  },
  passwordInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#2f3640',
  },
  eyeIcon: {
    padding: 10,
    paddingHorizontal: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIconInner: {
    color: '#30336b',
    fontSize: 30
  },
  button: {
    width: '80%',
    height: 48,
    backgroundColor: '#30336b',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#dff9fb',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
