import type {DetailedPageActionModalParams} from './types';

export default {
    welcomeApp: {
        getStarted: 'Get started below.',
        anotherLoginPageIsOpen: 'Another login page is open.',
        anotherLoginPageIsOpenExplanation: "You've opened the login page in a separate tab. Please log in from that tab.",
        welcomeBack: 'Welcome to IEATTA',
        welcome: 'New to IEATTA?',
        welcomeWithoutExclamation: 'Welcome',
        phrase2: "Money talks. And now that chat and payments are in one place, it's also easy.",
        phrase3: 'Your payments get to you as fast as you can get your point across.',
        enterPassword: 'Please enter your password',
    },
    detailedPageActionContextMenu: {
        editAction: ({modalName}: DetailedPageActionModalParams) => `Edit ${modalName}`,
        deleteAction: ({modalName}: DetailedPageActionModalParams) => `Delete ${modalName}`,
        deleteConfirmation: ({modalName}: DetailedPageActionModalParams) => `Are you sure you want to delete this ${modalName}?`,
    },
    detailedActionItem: {
        event: 'Event',
        person: 'Person',
        review: 'Review',
        reviews: 'Reviews',
    },
    notify: {
        login: {
            google: {
                start: 'Start to login with Google.',
                success: 'Login with Google success.',
                error: {cancel: 'Login with Google canceled.', unknown: 'Login with Google failed.', token: 'Fetch Google token failed.'},
            },
        },
        takePhoto: {
            start: 'Start to save the photo',
            success: 'Save the photo success',
            error: {
                camera: 'An error occurred while taking a photo, please try again.',
                noNetWork: 'Save the photo on offline mode.',
            },
        },
        auth: {
            unAuthed: "You're not logged in",
        },
        location: {
            disabled: 'We were unable to find your location. Please enable location services.',
        },
        add: {
            start: ({modalName}: DetailedPageActionModalParams) => `Start to add the ${modalName}`,
            success: ({modalName}: DetailedPageActionModalParams) => `Add the ${modalName} success`,
            failure: ({modalName}: DetailedPageActionModalParams) => `Add the ${modalName} failed`,
        },
        save: {
            start: ({modalName}: DetailedPageActionModalParams) => `Start to save the ${modalName}`,
            success: ({modalName}: DetailedPageActionModalParams) => `Save the ${modalName} success`,
            failure: ({modalName}: DetailedPageActionModalParams) => `Save the ${modalName} failed`,
        },
        delete: {
            start: ({modalName}: DetailedPageActionModalParams) => `Start to delete the ${modalName}`,
            success: ({modalName}: DetailedPageActionModalParams) => `Delete the ${modalName} success`,
            failure: ({modalName}: DetailedPageActionModalParams) => `Delete the ${modalName} failed`,
        },
    },
    headerPanel: {
        logo: 'home',
        menu: {button: 'menu'},
        photo: {
            grid: 'Photos',
            local: 'Photos',
        },
        search: {
            buttonSearch: 'Search for something...',
        },
        add: {
            button: 'Add',
        },
    },
    photos: {
        page: {
            seeAll: 'See all',
        },
        takePhoto: {
            button: {
                restaurant: 'add Restaurant',
                recipe: 'add Recipe',
                waiter: 'add Waiter',
            },
            title: 'Take Photos',
            error: {
                cameraErrorTitle: 'Camera Error.',
                cameraErrorMessage: 'An error occurred while taking a photo, please try again.',
            },
        },
        local: {
            title: 'Local Photos',
            noPhotos: 'no local photos',
        },
    },
    sections: {
        titles: {
            cover: 'Select a cover photo',
            currentAddress: 'Current Address',
            photos: 'Photos',
            events: 'Events',
            eventsRecorded: 'Events Recorded',
            eventWhatWhy: 'what/why:',
            eventPeopleOrdered: 'People Ordered',
            eventWaiters: 'Waiters',
            onTheMenu: 'On the Menu',
            reviews: 'Reviews',
            recommendedReviews: 'Recommended Reviews',
        },
        empty: {
            noRecipes: 'no recipes',
            noReviews: 'no reviews',
            noEvents: 'no events',
            noPeopleOrdered: 'no people ordered',
        },
    },
    remove: {
        orderedUser: {
            button: 'Remove users ordered',
        },
    },
    add: {
        recipe: {
            title: 'Add Recipes',
            button: 'Add Recipes',
            search: 'Search Recipes(by name)',
            section: {
                title: 'recipes',
            },
        },
        photo: {
            title: 'Add Photos',
            button: 'Add Photos',
        },
        waiter: {
            title: 'Add Waiters',
            button: 'Add Waiters',
        },
        orderedUser: {
            title: 'Add Users Ordered',
            button: 'Add users ordered',
            search: 'Search Users(by name)',
            section: {
                orderedUsersTitle: 'ordered users',
                title: 'users',
            },
        },
    },
    edit: {
        reset: 'Reset Form Date',
        button: {
            photo: 'edit',
        },
        photo: {
            button: 'Edit Photo',
            form: {
                header: {
                    new: 'New Photo',
                    edit: 'Edit Photo',
                },
                note: {
                    title: 'note',
                    placeholder: 'photo note',
                    error: 'note can be empty',
                },
            },
        },
        restaurant: {
            button: 'Edit Restaurant',
            form: {
                header: {
                    new: 'New Restaurant',
                    edit: 'Edit Restaurant',
                },
                displayName: {
                    title: 'displayName',
                    placeholder: 'restaurant name',
                    error: 'name can not be empty',
                },
                note: {
                    title: 'note',
                    placeholder: 'restaurant note',
                    error: 'note can be empty',
                },
            },
        },
        event: {
            button: 'Edit Event',
            form: {
                header: {
                    new: 'New Event',
                    edit: 'Edit Event',
                },
                displayName: {
                    title: 'displayName',
                    placeholder: 'event name',
                    error: 'name can not be empty',
                },
                want: {
                    title: 'want',
                    placeholder: 'want note',
                    error: 'note can be empty',
                },
                start: {
                    title: 'start time',
                    placeholder: 'start time',
                    error: 'time can be empty',
                },
                end: {
                    title: 'end time',
                    placeholder: 'end time',
                    error: 'time can be empty',
                },
            },
        },
        recipe: {
            button: 'Edit Recipe',
            form: {
                header: {
                    new: 'New Recipe',
                    edit: 'Edit Recipe',
                },
                displayName: {
                    title: 'displayName',
                    placeholder: 'recipe name',
                    error: 'name can not be empty',
                },
                price: {
                    title: 'price',
                    placeholder: 'recipe note',
                    error: {
                        empty: 'price can be empty.',
                        number: 'price can only be number.',
                    },
                },
            },
        },
        review: {
            button: 'Edit Review',
            form: {
                header: {
                    new: 'New Review',
                    edit: 'Edit Review',
                },
                note: {
                    title: 'Notes',
                    placeholder: 'review notes',
                    error: 'notes can be empty',
                },
            },
        },
    },
    sidebar: {
        header: {
            title: 'IEATTA',
            subTitle: 'Eating Experience Track',
        },
        search: {
            recentRestaurants: 'Recent Restaurants',
            message: 'Search nearby restaurants ...',
        },
        syncDB: {
            message: 'Syncing database ...',
        },
    },
    settingsPage: {
        troubleshooting: {
            description: 'If you are having trouble with IEATTA, you can try our troubleshooting guide.',
        },
    },
};
