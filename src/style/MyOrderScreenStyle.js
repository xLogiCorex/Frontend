import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    screen: { 
        flex: 1, 
        backgroundColor: '#f6f7fb' 
    },
    card: { 
        backgroundColor: '#fff', 
        marginHorizontal: 12, 
        marginTop: 10, 
        padding: 14, 
        borderRadius: 12, 
        borderWidth: 1, 
        borderColor: '#e5e7eb',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    cardContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardTextContainer: {
        flex: 1,
    },
    title: { 
        fontWeight: '700',
        fontSize: 16,
    },
    subtitle: { 
        marginTop: 4,
        fontSize: 14,
        color: '#4b5563',
    },
    meta: { 
        marginTop: 4, 
        color: '#6b7280', 
        fontSize: 12 
    },
    empty: { 
        textAlign: 'center', 
        marginTop: 24, 
        color: '#6b7280' 
    },
    badge: { 
        paddingHorizontal: 10, 
        paddingVertical: 6, 
        borderRadius: 999,
        marginLeft: 10,
        alignSelf: 'flex-start',
    },
    badgeText: { 
        color: 'white', 
        fontWeight: '700', 
        textTransform: 'capitalize',
        fontSize: 12,
    },
    actionButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    fab: { 
        position: 'absolute', 
        right: 18, 
        bottom: 24, 
        backgroundColor: '#0ea5e9', 
        width: 56, height: 56, 
        borderRadius: 28, 
        alignItems: 'center', 
        justifyContent: 'center', 
        elevation: 4 
    },
    fabText: { 
        color: '#fff', 
        fontSize: 28, 
        marginTop: -2 
    },
    center: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    
    // Modal stílusok
    modalCenteredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
        maxWidth: 400
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    orderNumber: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
        color: '#666',
        textAlign: 'center'
    },
    currentStatus: {
        fontSize: 14,
        color: '#888',
        marginBottom: 20,
        textAlign: 'center'
    },
    statusButtonsContainer: {
        width: '100%',
        marginBottom: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    statusButton: {
        padding: 12,
        borderRadius: 8,
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '48%', // Két gomb egymás mellett
    },
    statusButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'center',
    },
    statusNew: {
        backgroundColor: '#f59e0b'
    },
    statusConfirmed: {
        backgroundColor: '#3b82f6'
    },
    statusProcessing: {
        backgroundColor: '#6366f1'
    },
    statusCompleted: {
        backgroundColor: '#22c55e'
    },
    statusOnHold: {
        backgroundColor: '#f97316'
    },
    statusCancelled: {
        backgroundColor: '#ef4444'
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
    },
    modalButton: {
        borderRadius: 10,
        padding: 12,
        elevation: 2,
        minWidth: 100
    },
    modalButtonCancel: {
        backgroundColor: '#dc2626'
    },
    modalTextStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    actionButton: {
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        minWidth: 120,
    },
    invoiceButton: {
        backgroundColor: '#ee8f22ff',
    },
    completeButton: {
        backgroundColor: '#3b82f6',
    },
    actionButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
    },
});