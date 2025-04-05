#!/bin/bash

function PROJECT_ieatta_storybook() {
    step=$((step + 1))
    info "Start copying ieatta storybook"

    copy_folder_from_source_to_dest "src/components/ShadowSamples"

    copy_file_from_source_to_dest "src/stories/DetailedRestaurant.stories.tsx"
    copy_file_from_source_to_dest "src/stories/Restaurant.stories.tsx"
    copy_file_from_source_to_dest "src/stories/Review.stories.tsx"
    copy_file_from_source_to_dest "src/stories/ShadowSample.stories.tsx"
}
