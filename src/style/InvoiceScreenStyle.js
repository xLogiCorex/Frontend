import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    invoiceCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    invoiceInfo: {
        flex: 1
    },
    invoiceNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    partnerName: {
        fontSize: 14,
        color: '#666',
        marginTop: 4
    },
    invoiceDate: {
        fontSize: 12,
        color: '#888',
        marginTop: 2
    },
    invoiceAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#22c55e',
        marginTop: 4
    },
    downloadButton: {
        backgroundColor: '#3b82f6',
        padding: 10,
        borderRadius: 8
    },
    downloadButtonDisabled: {
        backgroundColor: '#9ca3af'
    },
    downloadButtonText: {
        color: 'white',
        fontWeight: '600'
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center'
    }
});